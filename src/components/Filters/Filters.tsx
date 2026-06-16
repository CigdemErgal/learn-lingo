import css from "./Filters.module.css";
type FiltersProps = {
  selectedPrice: string;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  selectedLevel: string;
  setSelectedLevel: React.Dispatch<React.SetStateAction<string>>;
};
function Filters({
  selectedPrice,
  setSelectedPrice,
  selectedLanguage,
  setSelectedLanguage,
  selectedLevel,
  setSelectedLevel,
}: FiltersProps) {
  return (
    <div className={css.filters}>
      <div className={css.filterGroup}>
        <p className={css.filterLabel}>Languages</p>
        <select
          className={css.languageSelect}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="All">All languages</option>
          <option value="French">French</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="German">German</option>
        </select>
      </div>
      <div className={css.filterGroup}>
        <p className={css.filterLabel}>Levels</p>
        <select
          className={css.levelSelect}
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="All">All levels</option>
          <option value="A1 Beginner">Beginner</option>
          <option value="A2 Elementary">Elementary</option>
          <option value="B1 Intermediate">Intermediate</option>
          <option value="B2 Upper-Intermediate">Upper-Intermediate</option>

          <option value="C1 Advanced">Advanced</option>
        </select>
      </div>
      <div className={css.filterGroup}>
        <p className={css.filterLabel}>Price</p>
        <select
          className={css.priceSelect}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="30">30 $</option>
          <option value="35">35 $</option>
          <option value="40">40 $</option>
          <option value="45">45 $</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
