import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import SecondHeading from '../atoms/SecondHeading'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  message: yup.string().min(10, 'Message should be at least 10 characters').required('Message is required'),
})

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('📨 Message sent:', data)
    toast.success('Message sent successfully! 🚀')
    reset()
  }

  return (
    <div className="py-36 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Info Section */}
        <div>
          <SecondHeading value="contact us" />
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quaerat autem corrupti asperiores accusantium
            et fuga! Facere excepturi, quo eos, nobis doloremque dolor labore expedita illum iusto, aut repellat fuga!
          </p>

          <ul className="text-gray-700 space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>
                34 Street Name, City Name Here,
                <br /> United States
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+1 (222) 345 6789</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <span>info@mywebsite.com</span>
            </li>
          </ul>
        </div>

        {/* Right: Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Your name"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <p className="text-sm text-red-500 mt-1">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows="5"
              {...register('message')}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
            ></textarea>
            <p className="text-sm text-red-500 mt-1">{errors.message?.message}</p>
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="bg-[#991010] text-white py-3 px-6 m-1 rounded-lg hover:-translate-y-1 hover:bg-[#742e24] transition-all flex gap-2"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
