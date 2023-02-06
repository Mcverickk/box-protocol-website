import styles from "@/styles/Team.module.css";
import Navbar from "../components/Navbar/Navbar";
import { CHIRAG, TARUN, SWAYAM } from "@/components/constants";

export default function Team() {
  const TeamCard = ({
    name,
    bio,
    image,
    linkedin,
    github,
    twitter,
    instagram,
    medium,
    email,
  }) => {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <img className={styles.profileImage} src={image} />
          <div className={styles.profileDetails}>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.socialLinks}>
              {email && (
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}`}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-envelope-at-fill"></i>
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-twitter"></i>
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              )}
              {medium && (
                <a
                  href={medium}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-medium"></i>
                </a>
              )}
            </div>

            <p className={styles.bio}>{bio}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <main className="main">
        <Navbar activePage="Team" />
        <div className={styles.body}>
          <TeamCard
            name="ChiragAgarwal.eth"
            image="./chirag.webp"
            bio={CHIRAG.BIO}
            linkedin={CHIRAG.LINKEDIN}
            github={CHIRAG.GITHUB}
            twitter={CHIRAG.TWITTER}
            instagram={CHIRAG.INSTAGRAM}
            medium={CHIRAG.MEDIUM}
            email={CHIRAG.EMAIL}
          />
          <TeamCard
            name="Tarun Chordia"
            image="./tarun.jpeg"
            bio={TARUN.BIO}
            linkedin={TARUN.LINKEDIN}
            twitter={TARUN.TWITTER}
            instagram={TARUN.INSTAGRAM}
            email={TARUN.EMAIL}
          />
          <TeamCard
            name="Swayam Ranjan"
            image="./swayam.jpeg"
            bio={SWAYAM.BIO}
            linkedin={SWAYAM.LINKEDIN}
            github={SWAYAM.GITHUB}
            twitter={SWAYAM.TWITTER}
            email={SWAYAM.EMAIL}
            instagram={SWAYAM.INSTAGRAM}
          />
        </div>
      </main>
    </>
  );
}
