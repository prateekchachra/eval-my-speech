import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            <div className = "pull-left">Copyright &copy; {new Date().getFullYear()}</div>
             <div className = "pull-right">Evaluate My Speech</div>

        </footer>
    )
}
