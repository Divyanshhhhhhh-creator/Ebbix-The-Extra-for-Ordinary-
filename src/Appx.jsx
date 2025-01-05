import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, Upload, Menu, Bell, Settings, ChevronDown, Heart, Share, Bookmark, Play, Volume2 } from 'lucide-react';

// Sample video data with channel subscription info
const VIDEOS_DATA = [
    {
        id: 1,
        title: "The Future of Technology: AI Revolution",
        channel: "TechChannel",
        channelId: "tech1",
        subscribers: "1.2M",
        views: "245K",
        timeAgo: "2 days ago",
        duration: "12:34",
        progress: 75,
        thumbnail: "/api/placeholder/400/225"
    },
    {
        id: 2,
        title: "Building Modern Web Applications with React",
        channel: "CodeMaster",
        channelId: "code1",
        subscribers: "850K",
        views: "182K",
        timeAgo: "1 week ago",
        duration: "25:18",
        progress: 30,
        thumbnail: "/api/placeholder/400/225"
    },
    {
        id: 3,
        title: "Digital Art Masterclass: From Beginner to Pro",
        channel: "ArtStation",
        channelId: "art1",
        subscribers: "500K",
        views: "98K",
        timeAgo: "3 days ago",
        duration: "45:22",
        progress: 90,
        thumbnail: "/api/placeholder/400/225"
    },
    {
        id: 4,
        title: "Cryptocurrency: Understanding Blockchain",
        channel: "CryptoWorld",
        channelId: "crypto1",
        subscribers: "750K",
        views: "156K",
        timeAgo: "5 days ago",
        duration: "18:45",
        progress: 0,
        thumbnail: "/api/placeholder/400/225"
    }
];

const StreamingApp = () => {
    // ... (previous state declarations remain the same)
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [subscribedChannels, setSubscribedChannels] = useState(new Set());

    const categories = [
        { id: 'all', label: 'All', icon: '🌟' },
        { id: 'gaming', label: 'Gaming', icon: '🎮' },
        { id: 'music', label: 'Music', icon: '🎵' },
        { id: 'tech', label: 'Tech', icon: '💻' },
        { id: 'art', label: 'Art', icon: '🎨' },
        { id: 'education', label: 'Education', icon: '📚' },
        { id: 'sports', label: 'Sports', icon: '⚽' },
        { id: 'cooking', label: 'Cooking', icon: '🍳' },
        { id: 'travel', label: 'Travel', icon: '✈️' }
    ];

    const handleSubscribe = (channelId) => {
        setSubscribedChannels(prev => {
            const newSet = new Set(prev);
            if (newSet.has(channelId)) {
                newSet.delete(channelId);
            } else {
                newSet.add(channelId);
            }
            return newSet;
        });
    };

    // ... (rest of the component remains the same until the VideoCard mapping)

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Previous navbar, sidebar, and other components remain the same */}

            <main className="pt-20 md:pl-64 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Featured Section */}
                    <div className="mb-8 rounded-xl overflow-hidden relative h-96">
                        <img
                            src="/api/placeholder/1200/400"
                            alt="Featured video"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
                            <div className="absolute bottom-8 left-8 right-8">
                                <h1 className="text-4xl font-bold mb-4">Featured: Advanced AI Technologies</h1>
                                <p className="text-lg mb-4 text-gray-300">Explore the latest developments in artificial intelligence</p>
                                <div className="flex items-center space-x-4">
                                    <button className="px-6 py-3 bg-cyan-500 rounded-lg hover:bg-cyan-600 flex items-center space-x-2">
                                        <Play className="w-5 h-5" />
                                        <span>Watch Now</span>
                                    </button>
                                    <SubscribeButton
                                        channelId="featured1"
                                        isSubscribed={subscribedChannels.has("featured1")}
                                        onSubscribe={() => handleSubscribe("featured1")}
                                        subscribers="2.5M"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array(12).fill(null).map((_, index) => {
                            const video = VIDEOS_DATA[index % VIDEOS_DATA.length];
                            return (
                                <VideoCard
                                    key={index}
                                    {...video}
                                    isSubscribed={subscribedChannels.has(video.channelId)}
                                    onSubscribe={() => handleSubscribe(video.channelId)}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

const SubscribeButton = ({ channelId, isSubscribed, onSubscribe, subscribers }) => (
    <button
        onClick={onSubscribe}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            isSubscribed
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-red-600 hover:bg-red-700'
        }`}
    >
        <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
        <span className="text-sm opacity-75">{subscribers}</span>
    </button>
);

const VideoCard = ({ title, channel, channelId, subscribers, views, timeAgo, duration, progress, thumbnail, isSubscribed, onSubscribe }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div
            className="group relative rounded-xl overflow-hidden bg-gray-800 hover:transform hover:scale-105 transition-all duration-200 shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-video relative">
                <img src={thumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                    <div className={`h-full bg-cyan-500`} style={{ width: `${progress}%` }} />
                </div>

                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                    {duration}
                </div>

                {isHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
                        <div className="flex space-x-4">
                            <button
                                className={`p-2 rounded-full ${isLiked ? 'bg-cyan-500' : 'bg-gray-800'} hover:bg-cyan-600 transition-colors`}
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                            <button className="p-2 rounded-full bg-gray-800 hover:bg-cyan-600 transition-colors">
                                <Share className="w-5 h-5" />
                            </button>
                            <button
                                className={`p-2 rounded-full ${isSaved ? 'bg-cyan-500' : 'bg-gray-800'} hover:bg-cyan-600 transition-colors`}
                                onClick={() => setIsSaved(!isSaved)}
                            >
                                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex space-x-3">
                    <img src="/api/placeholder/40/40" alt="Channel avatar" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-cyan-400 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                            <div>
                                <p className="text-sm text-gray-400 hover:text-cyan-400 cursor-pointer">
                                    {channel}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                                    <span>{views} views</span>
                                    <span>•</span>
                                    <span>{timeAgo}</span>
                                </div>
                            </div>
                            <SubscribeButton
                                channelId={channelId}
                                isSubscribed={isSubscribed}
                                onSubscribe={onSubscribe}
                                subscribers={subscribers}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamingApp;