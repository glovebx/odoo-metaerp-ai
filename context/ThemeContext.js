// 'use client';
// // context/ThemeContext.js
// import { createContext, useState, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
// 	const [theme, setTheme] = useState(null);

// 	useEffect(() => {
// 		// 检测系统主题偏好
// 		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
// 		const initialTheme = prefersDarkMode ? 'business' : 'corporate';
// 		const savedTheme = localStorage.getItem('theme') || initialTheme;
// 		if (theme !== savedTheme) {
// 			setTheme(savedTheme);
// 			document.documentElement.setAttribute('data-theme', savedTheme);
// 		}
// 	}, [theme]);

// 	const toggleTheme = () => {
// 		const newTheme = theme === 'corporate' ? 'business' : 'corporate';
// 		setTheme(newTheme);
// 		localStorage.setItem('theme', newTheme);
// 		document.documentElement.setAttribute('data-theme', newTheme);
// 	};

// 	if (!theme) {
// 		return null; // or a loading spinner
// 	}

// 	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
// };

// export default ThemeContext;

'use client';
// context/ThemeContext.js
import { createContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);

    // 修复1: 分离初始化逻辑，只运行一次
    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDarkMode ? 'cupcake' : 'dracula';
        const savedTheme = localStorage.getItem('theme') || initialTheme;
        
        // 直接设置主题，不进行条件判断
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // 监听系统主题变化
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('theme')) { // 只有用户未手动设置时才跟随系统
                const newTheme = e.matches ? 'cupcake' : 'dracula';
                setTheme(newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
            }
        };
        
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []); // 空依赖数组，只运行一次

    // 修复2: 使用 useCallback 优化 toggle 函数
    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'dracula' ? 'cupcake' : 'dracula';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // 保存用户选择
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme]); // 依赖 theme 确保使用最新值

    // 修复3: 提供加载状态而不是阻塞渲染
    const contextValue = {
        theme,
        toggleTheme,
        isThemeLoaded: theme !== null
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;