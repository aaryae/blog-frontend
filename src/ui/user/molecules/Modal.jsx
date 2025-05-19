const Modal = ({ title, children, onClose }) => (
  <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>
    <div className='bg-white p-6 rounded-xl w-full max-w-md relative'>
      <button className='absolute top-2 right-3 text-gray-500 hover:text-black' onClick={onClose}>✕</button>
      <h3 className='text-xl font-semibold mb-4'>{title}</h3>
      {children}
    </div>
  </div>
)

export default Modal;