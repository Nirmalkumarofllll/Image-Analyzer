"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const Header = () => {
    return (
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="flex items-center">
              <Image
                src={"/file.png"}
                alt="image"
                width={40}
                height={40}
                className="mr-3"
              />
              <h1 className="text-2xl font-bold text-blue-600">
                Image Identifier
              </h1>
            </div>
            {/* menus */}
            <nav>
              <ul className="flex space-x-4">
                <Link href={"#how-it-works"} className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                How it works</Link>
                <Link href={"#features"} className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out">
                Features</Link>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
}

export default Header;
