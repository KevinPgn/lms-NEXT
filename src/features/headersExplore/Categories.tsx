const categories = [
    {   
        name: "All",
    },
    {
        name: "AI",
    },
    {
        name: "Web Development",
    },
    {
        name: "Music",
    },
    {
        name: "Art",
    },
    {
        name: "Writing",
    },
    {
        name: "Video",
    },
    {
        name: "Photography",
    },
    {
        name: "Technology",
    },
    {
        name: "Science",
    },
    {
        name: "Business",
    },
    {
        name: "Marketing",
    },
    {
        name: "Finance",
    }  
]

export const Categories = () => {
return <div className="flex items-center justify-center gap-2 mt-8">
    {categories.map((category) => (
        <div key={category.name} className="flex items-center justify-center text-white/70 text-sm rounded-full px-4 py-2 border border-white/10 hover:border-white/30 hover:shadow-md hover:shadow-white/10 duration-75 cursor-pointer">
            {category.name}
        </div>
    ))}
  </div>
}