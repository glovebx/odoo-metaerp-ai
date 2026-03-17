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

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDarkMode ? 'business' : 'corporate';
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // 如果没有保存的主题，首次访问时强制设置为 'corporate' (明亮模式)
            setTheme('corporate');
            document.documentElement.setAttribute('data-theme', 'corporate');
        }
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'business' : 'corporate';
                setTheme(newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
            }
        };
        
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'corporate' ? 'business' : 'corporate';
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            return newTheme;
        });
    }, []);

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