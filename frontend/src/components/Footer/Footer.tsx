import { Logo } from "../Logo/Logo";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftPart}>
          <Logo />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem facilis odit maxime commodi vel aliquam, dignissimos
          dolorem ea? Dolor aut sequi sapiente sed eveniet? Sit quod reiciendis
          amet reprehenderit sed?
        </div>

        <div className={styles.rightPart}>
          <div className={styles.title}>Contact Us</div>

          <ul className={styles.contactList}>
            <li className={styles.item}>
              <div className={styles.name}>Email</div>
              <a
                href="mailto:anton.duchenko2@gmail.com"
                className={styles.link}
              >
                anton.duchenko2@gmail.com
              </a>
            </li>

            <li className={styles.item}>
              <div className={styles.name}>Phone</div>
              <a href="tel:+380738940242">+380738940242</a>
            </li>

            <li className={styles.item}>
              <div className={styles.name}>Address</div>
              <span>123 Main St, Anytown, USA</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
