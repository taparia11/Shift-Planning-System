import React from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast'

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  let navigate = useNavigate();

  // Method to logout the user
  const handleLogout = () => {
    toast.success("Logout Successfully")
    localStorage.removeItem('token');
    navigate('/login');
  }

  const redirectRegister = () => {
    navigate('/register');
  }
  const redirectLogin = () => {
    navigate('/login');
  }

  return (
    <>
      <div><Toaster /></div>
      <div className="relative w-full bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <Link to="/" >
              <span className="font-bold">Shift Planning System</span>
            </Link>
          </div>
          <div className="hidden grow items-start lg:flex">
            <ul className="ml-12 inline-flex space-x-8">
              {localStorage.getItem('raccess') === 'Admin' && <li>
                <a href="/admin/availability"
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Employee Availability
                </a>
              </li>
              }
              {localStorage.getItem('raccess') === 'Admin' && <li>
                <a href="/admin/shifts"
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Shift Creation
                </a>
              </li>
              }
              {localStorage.getItem('raccess') === 'Employee' && <li>
                <a href="/employee/availability"
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Availability
                </a>
              </li>
              }
              {localStorage.getItem('raccess') === 'Employee' && <li>
                <a href="/employee/shifts"
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Assigned Shift
                </a>
              </li>
              }
            </ul>
          </div>
          <div className="hidden space-x-2 lg:block">

            {!localStorage.getItem('token') ? <form className="d-flex mx-2">
              <Link className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" to="/register" role="button">Register</Link>
              <Link className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" to="/login" role="button">Login</Link>
            </form> : <button
              onClick={handleLogout}
              type="button"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Log Out
            </button>}


          </div>
          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <Link to="/" >
                        <span className="font-bold">Shift Planning System</span>
                      </Link>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                    </nav>
                  </div>
                  <div className="mt-2 space-y-2">
                    {!localStorage.getItem('token') ? <div>

                      <button
                        onClick={redirectRegister}
                        type="button"
                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Register
                      </button>
                      <button
                        onClick={redirectLogin}
                        type="button"
                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Log In
                      </button>
                    </div>
                      :
                      <button
                        onClick={handleLogout}
                        type="button"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Log Out
                      </button>
                    }

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar