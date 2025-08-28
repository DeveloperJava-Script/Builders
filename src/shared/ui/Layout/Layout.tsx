import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";


export const Layout = () => {




  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>

    </div>
  );
};
