import Link from 'next/link'
import React from 'react'

function Navigation() {
    return (
        <nav className="z-10 text-xl py-3 bg-sky-300">
            <ul className="flex gap-16 items-center justify-center">
                <li> <Link href="/"> Home </Link> </li>
                <li> <Link href="/products"> Products </Link> </li>
                <li> <Link href="/about"> About </Link> </li>
            </ul>
        </nav>
    )
}

export default Navigation
