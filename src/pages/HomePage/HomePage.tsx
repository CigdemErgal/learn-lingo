import css from "./HomePage.module.css";
import homeIcon from "../../assets/home-icon.svg";
import imacIcon from "../../assets/imac-icon.svg";
function HomePage() {
  return (
    <main className={css.main}>
      <section className={css.heroTopSection}>
        <div className={css.container}>
          <h1 className={css.bigTitle}>
            Unlock your potential with the best{" "}
            <span className={css.language}>language</span> tutors
          </h1>
          <p className={css.subTitle}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <button className={css.getStartedButton}>Get Started</button>
        </div>
        <div className={css.imageContainer}>
          <img src={homeIcon} alt="Home Icon" className={css.homeIcon} />
          <img src={imacIcon} alt="iMac Icon" className={css.imacIcon} />
        </div>
      </section>

      <section className={css.statsSection}>
        <div className={css.statisticsContainer}>
          <h2 className={css.statisticsTitle}>32,000 +</h2>
          <p className={css.statisticsSubtitle}>
            Experienced
            <br /> tutors
          </p>
          <h2 className={css.statisticsTitle}>300,000 +</h2>
          <p className={css.statisticsSubtitle}>
            5-star tutor
            <br /> reviews
          </p>
          <h2 className={css.statisticsTitle}>120 +</h2>
          <p className={css.statisticsSubtitle}>
            Subjects
            <br />
            taught
          </p>
          <h2 className={css.statisticsTitle}>200 +</h2>
          <p className={css.statisticsSubtitle}>
            Tutor
            <br />
            nationalities
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
