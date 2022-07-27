import { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, Tab, Tabs } from "react-bootstrap";
import { Alert } from "bootstrap";
import NotFound from "../NotFound";
import Loading from "../Loading";

const Results = ({ inputValue }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [show, setShow] = useState(false);

  const fetchRepo = async (username) => {
    try {
      setLoading(true);
      await axios
        .all([
          axios.get(`https://api.github.com/users/${username}/repos`),
          axios.get(`https://api.github.com/users/${username}/orgs`),
        ])
        .then(
          axios.spread((...responses) => {
            setError(false);
            console.log(responses[0].data);
            console.log(responses[1].data);
            setRepos(responses[0].data);
            setOrgs(responses[1].data);
            setShow(true);
          })
        )
        .catch((error) => {
          console.error("error fetching data:", error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (inputValue) {
      fetchRepo(inputValue);
    }
  }, [inputValue]);

  const repoList = repos.map((repo) => (
    <Card
      bg="Light"
      key={repo.id}
      style={{ width: "18rem" }}
      border="secondary"
      className="mb-2"
    >
      <Card.Header>
        <Card.Title>
          <a href={repo.url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>Owner: {repo.owner["login"]}</ListGroup.Item>
          <ListGroup.Item>Visibility: {repo.visibility}</ListGroup.Item>
          <ListGroup.Item>Watchers: {repo.watchers}</ListGroup.Item>
          <ListGroup.Item>Open Issues: {repo.open_issues}</ListGroup.Item>
          <ListGroup.Item>Language: {repo.language}</ListGroup.Item>
          <ListGroup.Item>Forks: {repo.forks}</ListGroup.Item>
          <ListGroup.Item>
            Homepage:{" "}
            <a href={repo.homepage} target="_blank" rel="noreferrer">
              {repo.homepage}
            </a>{" "}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  ));

  const orgsList = orgs.map((org) => (
    <h1 key={org.id}>{org.name}</h1>
    //  <Card
    //    bg="Light"
    //    key={repo.id}
    //    style={{ width: "18rem" }}
    //    border="secondary"
    //    className="mb-2"
    //  >
    //    <Card.Header>
    //      <Card.Title>
    //        <a href={repo.url} target="_blank" rel="noreferrer">
    //          {repo.name}
    //        </a>
    //      </Card.Title>
    //    </Card.Header>
    //    <Card.Body>
    //      <ListGroup>
    //        <ListGroup.Item>Owner: {repo.owner["login"]}</ListGroup.Item>
    //        <ListGroup.Item>Visibility: {repo.visibility}</ListGroup.Item>
    //        <ListGroup.Item>Watchers: {repo.watchers}</ListGroup.Item>
    //        <ListGroup.Item>Open Issues: {repo.open_issues}</ListGroup.Item>
    //        <ListGroup.Item>Language: {repo.language}</ListGroup.Item>
    //        <ListGroup.Item>Forks: {repo.forks}</ListGroup.Item>
    //        <ListGroup.Item>
    //          Homepage:{" "}
    //          <a href={repo.homepage} target="_blank" rel="noreferrer">
    //            {repo.homepage}
    //          </a>{" "}
    //        </ListGroup.Item>
    //      </ListGroup>
    //    </Card.Body>
    //  </Card>
  ));

  if (loading) {
    return <Loading />;
  }
  if (error.message === "Request failed with status code 404") {
    return <NotFound />;
  }
  if (error.message === "Network Error") {
    return <p className="status-message">Connection Error</p>;
  }
  return (
    <section className="result-area">
      {show && (
        <Tabs
          defaultActiveKey="repos"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="repos" title={`Repos (${repos.length})`}>
            {!error && <div className="grid">{repoList} </div>}{" "}
          </Tab>
          <Tab eventKey="orgs" title={`Organizations (${orgs.length})`}>
            {(orgsList.length = 0 ? <h2>Wow.....such empty</h2> : orgsList)}
          </Tab>
        </Tabs>
      )}
    </section>
  );
};

export default Results;
