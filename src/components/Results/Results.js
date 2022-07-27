import { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, Tab, Tabs, Table } from "react-bootstrap";
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
    <tr key={repo.id}>
      <td>
        <b>{repo.name}</b>
      </td>
      <td>{repo.description || "No Description"}</td>
      <td>{repo.language || "Not Specified"}</td>
      <td>{repo.visibility}</td>
      <td>{repo.watchers}</td>
      <td>{repo.open_issues}</td>
      <td>{repo.forks_count}</td>
      <td>
        {repo.homepage ? (
          <a href={repo.homepage} target="_blank" rel="noreferrer">
            View Homepage
          </a>
        ) : (
          "No homepage available"
        )}
      </td>
    </tr>
  ));
  const orgsList = orgs.map((org) => <h1 key={org.id}>{org.name}</h1>);

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
            {/* {!error && <div className="grid">{repoList} </div>}{" "} */}
            {!error && (
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>Repo Name</th>
                    <th>Description</th>
                    <th>Primary Language</th>
                    <th>Visibility</th>
                    <th># Watchers</th>
                    <th># Open Issues</th>
                    <th># Number of Forks</th>
                    <th>Homepage</th>
                  </tr>
                </thead>

                <tbody>{repoList}</tbody>
              </Table>
            )}
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
