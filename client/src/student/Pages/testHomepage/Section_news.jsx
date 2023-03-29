import NewsCard from "../../Component/NewsArticle";

const Section_news = () => {
  return (
    <div className="newsSection">
      <h1>News Articles</h1>
      <p>Fresh job related news content posted each day.</p>
      <div className="newsContainer">
        <NewsCard link="" title="Title" date="12 Dec 2023" />
        <NewsCard link="" title="Title" date="12 Dec 2023" />
        <NewsCard link="" title="Title" date="12 Dec 2023" />
      </div>
    </div>
  );
};

export default Section_news;
