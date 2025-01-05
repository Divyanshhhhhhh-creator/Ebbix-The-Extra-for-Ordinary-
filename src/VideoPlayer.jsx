import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Upload,
    Moon,
    Home,
    Gamepad,
    Music,
    Monitor,
    Palette,
    BookOpen,
    Trophy,
    Settings,
    PlayCircle,
    Volume2,
    Pause
} from 'lucide-react';

// Logo Component
const EbbixLogo = () => (
    <svg viewBox="0 0 200 200" className="w-8 h-8">
        <g transform="translate(100 100)">
            <path d="M0 -50 L-50 0 L0 0 Z" fill="#4a5568"/>
            <path d="M0 -50 L50 0 L0 0 Z" fill="#718096"/>
            <path d="M0 50 L-50 0 L0 0 Z" fill="#2d3748"/>
            <path d="M0 50 L50 0 L0 0 Z" fill="#1a202c"/>
            <circle cx="0" cy="0" r="20" fill="#0BC5EA"/>
        </g>
    </svg>
);

// Button Component
const Button = ({ children, variant = "default", size = "md", className = "", onClick }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors";
    const variants = {
        default: "bg-cyan-500 text-white hover:bg-cyan-600",
        secondary: "bg-white/10 text-gray-200 hover:bg-white/20",
        ghost: "text-gray-400 hover:bg-gray-800"
    };
    const sizes = {
        icon: "p-2",
        md: "px-4 py-2"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// Search Bar Component
const SearchBar = ({ searchTerm, setSearchTerm, showSuggestions, setShowSuggestions, searchRef }) => {
    const suggestions = [
        'AI Technology Trends',
        'AI in Healthcare',
        'AI Future Predictions',
        'AI Development Tools',
        'AI Ethics and Society'
    ].filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative flex-1 max-w-xl" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search videos..."
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {showSuggestions && searchTerm && (
                <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-lg z-50">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                                setSearchTerm(suggestion);
                                setShowSuggestions(false);
                            }}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Video Controls Component
const VideoControls = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="w-full h-1 bg-gray-600 rounded-full mb-4">
                <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ?
                            <Pause className="w-6 h-6 text-white" /> :
                            <PlayCircle className="w-6 h-6 text-white" />
                        }
                    </Button>

                    <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-white" />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="w-24"
                        />
                    </div>

                    <span className="text-white text-sm">0:00 / 10:00</span>
                </div>

                <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5 text-white" />
                </Button>
            </div>
        </div>
    );
};

// Video Player Component
const VideoPlayer = () => {
    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <img
                src="/api/placeholder/1280/720"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
            />
            <VideoControls />
        </div>
    );
};

// Main Video Platform Component
const VideoPlatform = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    const categories = [
        { icon: <Home className="w-4 h-4" />, label: 'All' },
        { icon: <Gamepad className="w-4 h-4" />, label: 'Gaming' },
        { icon: <Music className="w-4 h-4" />, label: 'Music' },
        { icon: <Monitor className="w-4 h-4" />, label: 'Tech' },
        { icon: <Palette className="w-4 h-4" />, label: 'Art' },
        { icon: <BookOpen className="w-4 h-4" />, label: 'Education' },
        { icon: <Trophy className="w-4 h-4" />, label: 'Sports' }
    ];

    const sideVideos = Array(6).fill(null).map((_, i) => ({
        id: i + 1,
        title: "The Future of Technology: AI Revolution",
        channel: "TechChannel",
        views: "245K views",
        timestamp: "2 days ago",
        duration: "12:34"
    }));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 border-b border-gray-800 px-4 py-3 bg-gray-900 z-10">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <EbbixLogo />
                            <span className="text-cyan-400 text-xl font-bold">Ebbix</span>
                        </div>

                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                            searchRef={searchRef}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Upload className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                            <Moon className="w-5 h-5" />
                        </Button>
                        <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center">
                            <span className="text-sm">3</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-16">
                {/* Categories */}
                <div className="border-b border-gray-800 px-4 py-3 sticky top-16 bg-gray-900 z-10">
                    <div className="max-w-[1600px] mx-auto flex gap-2 overflow-x-auto">
                        {categories.map((category, index) => (
                            <Button
                                key={index}
                                variant={index === 0 ? "default" : "secondary"}
                                className="flex items-center gap-2 whitespace-nowrap"
                            >
                                {category.icon}
                                {category.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Video Content */}
                <div className="max-w-[1600px] mx-auto p-4">
                    <VideoPlayer />

                    {/* Recommended Videos */}
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {sideVideos.map((video) => (
                            <div
                                key={video.id}
                                className="flex gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
                            >
                                <div className="relative w-40 h-24">
                                    <img
                                        src="/api/placeholder/160/90"
                                        alt={video.title}
                                        className="rounded object-cover w-full h-full"
                                    />
                                    <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                    {video.duration}
                  </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                                    <p className="text-sm text-gray-400">{video.channel}</p>
                                    <p className="text-xs text-gray-500">
                                        {video.views} • {video.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VideoPlatform;
