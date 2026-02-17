import Select from '../UI/Select'
import Input from '../UI/Input'

const FilterPanel = ({ filters, onFilterChange }) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'shop', label: 'Shop' },
    { value: 'service', label: 'Service' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'healthcare', label: 'Healthcare' }
  ]

  const ratingOptions = [
    { value: '0', label: 'Any Rating' },
    { value: '3', label: '3+ Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '4.5', label: '4.5+ Stars' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          options={categoryOptions}
        />
        <Input
          label="Location"
          type="text"
          value={filters.location}
          onChange={(e) => onFilterChange({ location: e.target.value })}
          placeholder="City, State"
        />
        <Select
          label="Minimum Rating"
          value={filters.minRating.toString()}
          onChange={(e) => onFilterChange({ minRating: parseFloat(e.target.value) })}
          options={ratingOptions}
        />
      </div>
    </div>
  )
}

export default FilterPanel