# GitHub PR Info

This project is an API that uses the GitHub API to return information about open pull requests for a given repository.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (comes with Node.js)

### Installing

1. Clone the repository
   
`git clone https://github.com/yourusername/yourrepo.git`

2. Install the dependencies

`npm install`
### Running the API

To start the API, run the following command:

`npm start`

The API will be running on `http://localhost:8088/prinfo`
You can send a GET request to the API with a `repo` query parameter that contains a repository URL in the format `username/repo`.

### Running the tests

To run the tests, run the following command:

`npm test`

This command will run all the test files in the `test` directory.

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime
- [Express](https://expressjs.com/) - The web framework for Node.js

## Authors

- **Jacob Henri** - *Initial work* - [jmhenri](https://github.com/jmhenri)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details