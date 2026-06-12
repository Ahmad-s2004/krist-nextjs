"use client";
export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full bg-white font-sans text-gray-800 antialiased min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black sm:text2xl sm:text-start text-center">
              Contact Us
            </h1>
            <p className="mt-4 text-base text-gray-500 max-w-sm w-11/12 mx-auto">
              We'd love to hear from you. Please fill out the form or reach out via our official channels.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-gray-50 rounded-lg text-black shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black tracking-wide uppercase">Our Store</h3>
                <p className="mt-1 text-sm text-gray-600 leading-6">123 Fashion Street, Sector W,<br />Lahore, Pakistan</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-gray-50 rounded-lg text-black shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622s.557-.83 1.16-1.162c.621-.343 1.301-.442 2.012-.016L7.9 6.94c.547.322.89.84.86 1.44a2.605 2.605 0 0 1-1.04 1.838l-.647.478a11.25 11.25 0 0 0 5.031 5.03l.478-.647c.34-.458.908-.76 1.44-.86a2.605 2.605 0 0 1 1.839 1.04l1.416 1.872c.426.711.327 1.391-.016 2.012a6.342 6.342 0 0 1-1.162 1.16c-1.394.945-3.52.56-5.875-1.795-2.356-2.354-2.74-4.48-1.795-5.875Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black tracking-wide uppercase">Call Us</h3>
                <p className="mt-1 text-sm text-gray-600">+92 (300) 123-4567</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-gray-50 rounded-lg text-black shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black tracking-wide uppercase">Support Email</h3>
                <p className="mt-1 text-sm text-gray-600">support@krist.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  required
                  className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400 bg-white"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  required
                  className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400 bg-white"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400 bg-white"
                placeholder="johndoe@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400 bg-white"
                placeholder="Order Query / Feedback"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400 resize-none bg-white"
                placeholder="Write your message here..."
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-medium text-sm rounded-lg hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}