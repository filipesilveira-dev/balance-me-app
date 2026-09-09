import style from "./Header.module.css";
import favicon from "@/assets/favicon.png"
import menu from "@/assets/menu.svg"
import user from "@/assets/user.svg"

export function Header() {
  return (
    <>
      <header className={style.header}>
        <div className={style.header_container}>
          <img
            className={style.menu}
            src={menu}
            alt="Imagem do menu hambúrguer"
          />
          <div className={style.logo_container}>
            <img
              className={style.logo_img}
              src={favicon}
              alt="Imagem do logo do app"
            />
            <span className={style.logo_text}>Balance Me</span>
          </div>
          <div className={style.navbar_user_container}>
              <nav className={style.navbar}>
                <span className={style.nav_item}>Hoje</span>
                <span>|</span>
                <span className={style.nav_item}>Semana</span>
                <span>|</span>
                <span className={style.nav_item}>Histórico</span>
              </nav>
              <img className={style.user} src={user} />
          </div>
        </div>
      </header>
    </>
  );
}
