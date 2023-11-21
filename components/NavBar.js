function NavBar() {
  return (
    <div className="navbar bg-base-100 m-0 h-8 min-h-fit">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Blend Fuel</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>A Propos</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
