import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import SuperHeroesPage from "./components/SuperHeroesPage"
import RQSuperHeroesPage from "./components/RQSuperHeroesPage"
import HomePage from "./components/HomePage"
import "./App.css"
import SuperHeroDetails from "./components/SuperHeroDetails"
import ParallelQueriesPage from "./components/ParallelQueriesPage"
import DynamicParallelQueriesPage from "./components/DynamicParallelQueriesPage"
import DependantQueriesPage from "./components/DependantQueriesPage"
import PaginatedQueriesPage from "./components/PaginatedQueriesPage"
import InfiniteQueriesPage from "./components/InfiniteQueriesPage"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            {/* heroId will take in the individual id of the superhero */}
            {/* make sure to add these types of routes that take in an id are placd at the top */}
            <Route path="/rq-superHeroDetails/:heroId">
              <SuperHeroDetails />
            </Route>
            <Route path="/rq-infinite">
              <InfiniteQueriesPage />
            </Route>
            <Route path="/rq-paginated">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/rq-dependent">
              <DependantQueriesPage email='vishwas@example.com' />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueriesPage />
            </Route>
            <Route path="/rq-dynamic">
              <DynamicParallelQueriesPage heroIds = {[1,3]} />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  )
}

export default App
