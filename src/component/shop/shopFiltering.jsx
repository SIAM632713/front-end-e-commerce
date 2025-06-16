import React from 'react';

const Filter={
    categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        {label: "Under $50", min: 0, max: 50},
        {label: "$50 - $100", min: 50, max: 100},
        {label: "$100 - $200", min: 100, max: 200},
        {label: "$200 and above", min: 200, max: Infinity},
    ]
}



const ShopFiltering = ({ filterState, setFilterState, clearFilterState }) => {
    return (
        <div className="p-5 bg-white w-full md:w-64 space-y-5  md:overflow-y-auto rounded shadow">
            <h3 className="text-xl font-semibold text-gray-800">Filters</h3>

            {/* Category Filter */}
            <div className="flex flex-col space-y-3">
                <h4 className="font-medium text-lg text-gray-700">Category</h4>
                <hr className="border-gray-300"/>
                {
                    Filter.categories.map((category, index) => (
                        <label
                            key={index}
                            className="capitalize cursor-pointer flex items-center gap-2 text-gray-600"
                        >
                            <input
                                type="radio"
                                name='category'
                                value={category}
                                checked={filterState.category === category}
                                onClick={(e) => setFilterState({ ...filterState, category: e.target.value })}
                                className="accent-blue-500"
                            />
                            <span>{category}</span>
                        </label>
                    ))
                }
            </div>

            {/* Colors Filter */}
            <div className="flex flex-col space-y-3">
                <h4 className="font-medium text-lg text-gray-700">Color</h4>
                <hr className="border-gray-300"/>
                {
                    Filter.colors.map((color, index) => (
                        <label
                            key={index}
                            className="capitalize cursor-pointer flex items-center gap-2 text-gray-600"
                        >
                            <input
                                type="radio"
                                name='color'
                                value={color}
                                checked={filterState.color === color}
                                onClick={(e) => setFilterState({ ...filterState, color: e.target.value })}
                                className="accent-blue-500"
                            />
                            <span>{color}</span>
                        </label>
                    ))
                }
            </div>

            {/* Price Range Filter */}
            <div className="flex flex-col space-y-3">
                <h4 className="font-medium text-lg text-gray-700">Price Range</h4>
                <hr className="border-gray-300"/>
                {
                    Filter.priceRanges.map((range, index) => (
                        <label key={index} className="capitalize cursor-pointer flex items-center gap-2 text-gray-600">
                            <input
                                type="radio"
                                name='priceRange'
                                value={`${range.min}-${range.max}`}
                                checked={filterState.priceRange === `${range.min}-${range.max}`}
                                onChange={(e) => setFilterState({ ...filterState, priceRange: e.target.value })}
                                className="accent-blue-500"
                            />
                            <span>{range.label}</span>
                        </label>
                    ))
                }
            </div>

            {/* Clear Button */}
            <button
                onClick={clearFilterState}
                className="mt-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default ShopFiltering;
