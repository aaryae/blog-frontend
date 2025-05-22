import { useState, useEffect } from 'react'
import { getCommentsByPost, addReview, deleteReview } from '../../../services/review/reviewService'
import { Send, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch comments on mount
  const fetchComments = async () => {
    setLoading(true)
    try {
      const data = await getCommentsByPost(postId)
      setComments(data)
    } catch {
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (postId) fetchComments()
    // eslint-disable-next-line
  }, [postId])

  // Handle new comment submit
  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setSubmitting(true)
    try {
      // Get userId and cmtName from localStorage (update as needed for your auth system)
      const userId = Number(localStorage.getItem('userId'))
      const cmtName = localStorage.getItem('username') || 'Anonymous'

      // Send correct payload to backend
      await addReview({
        cmtName,
        postId,
        userId,
        // If your backend expects a message, add: content: newComment,
      })

      setNewComment('')
      toast.success('Comment added!')
      fetchComments()
    } catch (error) {
      toast.error('Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      await deleteReview(id)
      toast.success('Comment deleted!')
      fetchComments()
    } catch {
      toast.error('Failed to delete comment')
    }
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded focus:outline-none"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={submitting}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
          disabled={submitting}
        >
          <Send size={16} /> Post
        </button>
      </form>
      {loading ? (
        <div className="text-gray-400 text-sm">Loading comments...</div>
      ) : (
        <ul className="space-y-4">
          {comments.length === 0 ? (
            <li className="text-gray-400 text-sm">No comments yet.</li>
          ) : (
            comments.map((c) => (
              <li key={c.id} className="bg-gray-50 border rounded-lg p-3 flex justify-between items-start">
                <div>
                  <div className="font-semibold">{c.cmtName || c.username || 'Anonymous'}</div>
                  {/* If your backend returns comment content, show it here */}
                  {c.content && (
                    <div className="text-sm text-gray-700 mt-1">{c.content}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {c.createdDate
                      ? new Date(c.createdDate).toLocaleString()
                      : ''}
                  </div>
                </div>
                <button
                  className="text-red-500 hover:underline ml-4"
                  onClick={() => handleDelete(c.id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default CommentSection
