import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'


const NavBar = () => {
    const [open, setOpen] = React.useState(false);

    const [active, setActive] = React.useState(false);
    const [session, loading] = useSession()
    const router = useRouter()


    const handleClick = () => {
        setActive(!active);
    };

    const dashboard = () => {
        router.push('/register')
    }



    return (
        <>
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="relative bg-black">
                <div className="max-w-auto mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1 ">
                            <a href="#">
                                <span className="sr-only">Workflow</span>
                                <img
                                    className="h-16 w-auto sm:h-16"
                                    src="https://svgshare.com/i/Y0T.svg"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <button
                                type="button"
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick={() => setOpen(!open)}
                            >
                                <span className="sr-only">Open menu</span>
                                {/* Heroicon name: outline/menu */}
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                        <nav className="hidden md:flex space-x-10">
                            <div className="relative">
                                {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                                <a
                                    href='#'
                                    className="text-base font-medium text-white hover:text-indigo-500"
                                >
                                    <Link href='/'>
                                        <span >Home</span>
                                    </Link>

                                </a>
                            </div>
                            {/*
              'Solutions' flyout menu, show/hide based on flyout menu state.
  
              Entering: "transition ease-out duration-200"
                From: "opacity-0 translate-y-1"
                To: "opacity-100 translate-y-0"
              Leaving: "transition ease-in duration-150"
                From: "opacity-100 translate-y-0"
                To: "opacity-0 translate-y-1"
            */}

                            <div className="relative">
                                <a
                                    href='#'
                                    className="text-base font-medium text-white hover:text-indigo-500"
                                >
                                    <Link href='/lyrics'>

                                        Lyrics App

                                </Link>
                                </a>
                            </div>

                            <div className="relative">

                                <a
                                    href='#'
                                    className="text-base font-medium text-white hover:text-indigo-500"
                                >
                                    <Link href='/clean'>

                                        Clean My Playlist

                                </Link>
                                </a>
                            </div>


                        </nav>

                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

                            {!session ? (
                                <a
                                    onClick={() => signIn()}
                                    href='#'
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Sign In
                                </a>

                            ) : null}

                            {session ? (
                                <a
                                    onClick={() =>  signOut()}
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Sign Out
                                </a>) : null}
                        </div>
                    </div>
                </div>
                {/*
      Mobile menu, show/hide based on mobile menu state.
  
      Entering: "duration-200 ease-out"
        From: ""
        To: ""
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    */}

                <div
                    className={
                        open
                            ? "opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                            : "opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    }
                >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-black relative">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-16 w-auto"
                                        src="https://svgshare.com/i/Y0T.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        onClick={() => setOpen(!open)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        {/* Heroicon name: outline/x */}
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    <a
                                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-90"
                                    >
                                        {/* Heroicon name: outline/chart-bar */}
                                        <Link href='/'>
                                            <span className="ml-3 text-base font-medium text-white">
                                                Home
                                            </span>
                                        </Link>
                                    </a>
                                    <a
                                        href="#"
                                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                    >
                                        <Link href='/lyrics'>
                                            {/* Heroicon name: outline/chart-bar */}
                                            <span className="ml-3 text-base font-medium text-white">
                                                Lyrics App
                      </span>
                                        </Link>
                                    </a>
                                    <a
                                        href="#"
                                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                    >
                                        <Link href='/clean'>
                                            {/* Heroicon name: outline/cursor-click */}
                                            <span className="ml-3 text-base font-medium text-white">
                                                Clean My Playlist
                      </span>
                                        </Link>
                                    </a>
                                </nav>
                            </div>
                        </div>
                        {!session ? (
                            <div className="py-6 px-5">
                                <div>

                                    <a
                                        onClick={() => signIn()}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Sign in 
                  </a>
                                </div>
                            </div>
                        ) : null}
                        {session ? (
                            <div className="py-6 px-5">
                                <div>
                                    <a
                                        onClick={() =>  signOut()}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Sign Out
                  </a>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar