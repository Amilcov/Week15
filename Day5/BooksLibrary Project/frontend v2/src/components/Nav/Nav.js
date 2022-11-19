import './Nav.css'


function Nav() {

    return (
   
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mt-0 pt-0">
          <a class="navbar-brand" href="/stock">Books Library</a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/transactions"> Books </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/transactions"> Readers </a>
              </li>
              </ul>
              <span className="navbar-text px-4">
                <a className="btn btn-sm btn-dark mr-2" href="/login"> Login </a>
                <a className="btn btn-sm btn-dark" href="/signup"> Register </a>
            </span>
           </div>
        </nav>
    ) 

};

export default Nav;