const Navbar = ({}) => {
  return (
    <div className="employer_navbar">
      <div>
        <a href="/student/home">Home</a>
        <a href="/student/profile">Record Your Profile</a>
        <a href="/student/job">Jobs</a>
      </div>
      <div>
        <a href="/student/login" className="employerBTNLink-light">
          Login
        </a>
        <a href="/student/register" className="employerBTNLink">
          Register
        </a>

        {/* <a className="employerBTNLink" href="">
          Log Out
        </a> */}
      </div>
    </div>
  );
};

export default Navbar;
