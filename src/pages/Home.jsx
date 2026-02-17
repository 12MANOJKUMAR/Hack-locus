import { useApp } from '../context/AppContext'
import BusinessList from '../components/Business/BusinessList'
import SearchBar from '../components/Search/SearchBar'
import FilterPanel from '../components/Filter/FilterPanel'

const Home = () => {
  const { businesses, filters, updateFilters } = useApp()

  const handleSearch = (query) => {
    updateFilters({ searchQuery: query })
  }

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Discover Local Businesses
        </h1>
        <p className="text-gray-600">
          Find and review the best local businesses in your area
        </p>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Businesses ({businesses.length})
          </h2>
        </div>
        <BusinessList businesses={businesses} />
      </div>
    </div>
  )
}

export default Home