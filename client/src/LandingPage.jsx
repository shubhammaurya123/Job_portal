import React from 'react'

const LandingPage = () => {
    return (
        <div> Landing Page
            <div>
                <button>
                    <a href="/student/home">For Students</a>
                </button>
                <button>
                    <a href="/employer">For Employers</a>
                </button>
                <button>
                    <a href="/admin/dashboard">For Admin</a>
                </button>
            </div>
        </div>
    )
}

export default LandingPage