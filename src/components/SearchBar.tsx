export default function SearchBar(){

    return <form action="/search" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search Recipes"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
}
