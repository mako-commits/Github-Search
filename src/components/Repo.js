import { useState } from "react";
import { Card, ListGroup, Tabs, Tab } from "react-bootstrap";

const Repo = () => {
  const [repos, setRepos] = useState([]);
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
  return;

  <div>{repoList}</div>;
};

export default Repo;
