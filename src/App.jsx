import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, Upload, Menu, Bell, Settings, ChevronDown, Heart, Share, Bookmark } from 'lucide-react';

// Search suggestions data (in real app, this would come from an API)
const SEARCH_SUGGESTIONS = [
    "Latest Tech Reviews",
    "Gaming Streams",
    "Tech Tutorials",
    "Digital Art",
    "Web Development",
    "AI and ML",
    "Crypto News",
    "The BlockChain world",
    "Smart Contract",
    "Building the Web",
    "Building the Web 3.0",
    "The Web 3.0"
];

// Main App Component
const StreamingApp = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const filteredSuggestions = SEARCH_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Simulated notification data
    useEffect(() => {
        setNotifications([
            { id: 1, text: "New video from TechChannel", time: "2m ago" },
            { id: 2, text: "Your video is trending!", time: "1h ago" },
            { id: 3, text: "New subscriber", time: "3h ago" }
        ]);
    }, []);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 px-4 py-3 backdrop-blur-md bg-opacity-80 border-b border-cyan-900">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 hover:bg-cyan-900 rounded-lg md:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                            <img src={'logo.png'} alt={"Logo Ebbix"} loading="lazy" />
                            Ebbix<br/>
            </span>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-4 relative">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search videos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                className="w-full px-4 py-2 bg-gray-800 border border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <button
                                className="absolute right-3 top-2.5 p-1 hover:bg-cyan-800 rounded-full transition-colors"
                                onClick={() => {/* Handle search */}}
                            >
                                <Search className="w-5 h-5 text-cyan-400" />
                            </button>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && searchQuery && (
                                <div className="absolute w-full mt-2 bg-gray-800 border border-cyan-700 rounded-lg shadow-lg z-50">
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-cyan-900 cursor-pointer"
                                            onClick={() => {
                                                setSearchQuery(suggestion);
                                                setShowSuggestions(false);
                                            }}
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                className="p-2 hover:bg-cyan-900 rounded-full transition-colors"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-cyan-700 rounded-lg shadow-lg">
                                    {notifications.map(notification => (
                                        <div key={notification.id} className="p-3 hover:bg-cyan-900 border-b border-cyan-700">
                                            <p className="text-sm">{notification.text}</p>
                                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            className="p-2 hover:bg-cyan-900 rounded-full transition-colors"
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity">
                            <Upload className="w-5 h-5" />
                            <span className="hidden md:inline">Upload</span>
                        </button>

                        {/* User Profile */}
                        <div className="relative">
                            <button className="flex items-center space-x-2">
                                <img
                                    src="/api/placeholder/32/32"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border-2 border-cyan-500"
                                />
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Enhanced Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-60 bg-gray-800 transform transition-transform duration-200 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40 pt-20`}>
                <div className="flex flex-col space-y-2 p-4">
                    <SidebarItem icon="🏠" label="Home" active />
                    <SidebarItem icon="🔥" label="Trending" />
                    <SidebarItem icon="✨" label="New" />
                    <SidebarItem icon="📚" label="Library" />
                    <SidebarItem icon="⏱️" label="History" />
                    <SidebarItem icon="❤️" label="Liked Videos" />
                    <hr className="border-cyan-900" />
                    <h3 className="text-sm text-cyan-400 mt-4">Your Channels</h3>
                    <SidebarItem icon="🎮" label="Gaming Channel" />
                    <SidebarItem icon="💻" label="Tech Reviews" />
                    <hr className="border-cyan-900" />
                    <h3 className="text-sm text-cyan-400 mt-4">Subscriptions</h3>
                    <SidebarItem icon="👤" label="TechChannel" />
                    <SidebarItem icon="👤" label="ArtStation" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="pt-20 md:pl-64 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Categories Scroll */}
                    <div className="flex space-x-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                        {["All", "Gaming", "Music", "Tech", "Art", "Education", "Sports"].map((category) => (
                            <button
                                key={category}
                                className="px-4 py-2 bg-cyan-900 rounded-full hover:bg-cyan-800 whitespace-nowrap"
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                    </div>

                    <h2 className="text-2xl font-bold my-6">Continue Watching</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                    </div>
                </div>
            </main>
        </div>
    );
};

// Enhanced Sidebar Item Component
const SidebarItem = ({ icon, label, active }) => (
    <button className={`flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-cyan-900 w-full text-left ${active ? 'bg-cyan-900' : ''}`}>
        <span>{icon}</span>
        <span>{label}</span>
    </button>
);

// Enhanced Video Card Component
const VideoCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div
            className="group relative rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-video bg-gray-800 relative">
                <img
                    src="/api/placeholder/400/225"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                />
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                    <div className="w-3/4 h-full bg-cyan-500"></div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                    12:34
                </div>

                {/* Hover overlay */}
                {isHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="flex space-x-4">
                            <button
                                className={`p-2 rounded-full ${isLiked ? 'bg-cyan-500' : 'bg-gray-800'} hover:bg-cyan-600`}
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                                <Share className="w-5 h-5" />
                            </button>
                            <button
                                className={`p-2 rounded-full ${isSaved ? 'bg-cyan-500' : 'bg-gray-800'} hover:bg-cyan-600`}
                                onClick={() => setIsSaved(!isSaved)}
                            >
                                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-3">
                <div className="flex space-x-3">
                    <img
                        src="/api/placeholder/40/40"
                        alt="Channel avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-cyan-400 transition-colors">
                            The Future of Technology: AI Revolution
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 hover:text-cyan-400 cursor-pointer">
                            TechChannel
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                            <span>245K views</span>
                            <span>•</span>
                            <span>2 days ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamingApp;