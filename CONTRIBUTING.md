# Contributing to Noto

Thank you for considering contributing to **Noto**! We welcome contributions from developers who want to help improve this elegant note-taking application.

## 👨‍💻 About the Project

**Noto** is maintained by [Chaklesh Yadav](https://github.com/chaklesh), a Software Development Engineer (SDE). This project is open for personal use and development, with proper attribution required for any modifications or derivative works.

## 🚀 Quick Start

1. **Fork the repository**
   ```bash
   git clone https://github.com/chaklesh/noto.git
   cd noto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   ```

4. **Start development**
   ```bash
   npm start
   ```

5. **Make your changes and test**
   ```bash
   npm test
   npm run lint
   ```

6. **Commit and push**
   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/your-amazing-feature
   ```

7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style & Standards

- **ESLint & Prettier**: We use automated code formatting
- **React Best Practices**: Follow modern React patterns
- **Meaningful Commits**: Use conventional commit messages
- **Documentation**: Comment complex logic and update docs

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic changes)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(notes): add drag and drop reordering functionality
fix(sidebar): resolve mobile menu overlap issue
docs(readme): update installation instructions
style(components): improve code formatting consistency
refactor(hooks): optimize useNotes hook performance
test(notecard): add comprehensive unit tests
chore(deps): update dependencies to latest versions
```

### Pull Request Process

1. **Branch Naming**: Use descriptive names like `feature/drag-drop`, `fix/mobile-menu`, `docs/api-update`
2. **Description**: Provide clear description of changes and motivation
3. **Testing**: Ensure all tests pass and add new tests for new features
4. **Documentation**: Update relevant documentation
5. **Changelog**: Add entry to CHANGELOG.md for significant changes
6. **Review**: Request review from maintainers

### Code Quality Checklist

- [ ] Code follows project conventions
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] No console.log statements in production code
- [ ] Components are properly documented
- [ ] Responsive design is maintained
- [ ] Accessibility guidelines followed

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- NoteCard.test.js
```

### Testing Guidelines
- Write tests for new features
- Maintain existing test coverage
- Use descriptive test names
- Test both happy path and edge cases
- Mock external dependencies appropriately

## 🎯 Areas for Contribution

### 🔥 High Priority
- [ ] **Dark Mode**: Implement system-wide dark theme
- [ ] **Rich Text Editor**: Add formatting options (bold, italic, lists)
- [ ] **Export Functionality**: PDF and Markdown export
- [ ] **Search Improvements**: Advanced filters and search operators
- [ ] **Accessibility**: WCAG 2.1 AA compliance improvements

### 🚀 Medium Priority
- [ ] **Tags System**: Advanced categorization beyond colors
- [ ] **Note Templates**: Pre-defined note structures
- [ ] **Keyboard Shortcuts**: More power user features
- [ ] **Collaborative Features**: Real-time sharing capabilities
- [ ] **Cloud Sync**: Integration with cloud storage services

### 💡 Ideas & Experiments
- [ ] **Voice Notes**: Audio recording and transcription
- [ ] **Drawing Support**: Simple sketching capabilities
- [ ] **Plugin System**: Extensible architecture
- [ ] **Themes**: Multiple color schemes and customization
- [ ] **PWA Features**: Offline functionality and app-like experience

## 🐛 Bug Reports

When reporting bugs, please include:

### Bug Report Template
```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., Windows 10, macOS 12, Ubuntu 20.04]
- Browser: [e.g., Chrome 91, Firefox 89, Safari 14]
- Device: [e.g., Desktop, iPhone 12, Samsung Galaxy S21]
- Screen Size: [e.g., 1920x1080, 375x667]

**Screenshots**
If applicable, add screenshots

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

For new features, please consider:

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternative Solutions**
Other approaches considered

**User Stories**
- As a [user type], I want [goal] so that [benefit]

**Acceptance Criteria**
- [ ] Criteria 1
- [ ] Criteria 2

**Design Considerations**
UI/UX mockups or descriptions (optional)

**Technical Considerations**
Implementation notes (optional)
```

## 🏗️ Architecture Guidelines

### Component Structure
```jsx
// Recommended component structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ 
  prop1, 
  prop2, 
  onAction 
}) => {
  // 1. Hooks at the top
  const [state, setState] = useState(initialValue);
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 3. Event handlers
  const handleEvent = (e) => {
    // Handler logic
    onAction?.(data);
  };
  
  // 4. Computed values
  const computedValue = useMemo(() => {
    return expensiveComputation(state);
  }, [state]);
  
  // 5. Render
  return (
    <div className="component-class">
      {/* JSX content */}
    </div>
  );
};

// PropTypes (optional but recommended)
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func
};

// Default props
ComponentName.defaultProps = {
  prop2: 0
};

export default ComponentName;
```

### File Naming Conventions
- **Components**: PascalCase (`NoteCard.jsx`, `SidebarMenu.jsx`)
- **Hooks**: camelCase with "use" prefix (`useNotes.js`, `useLocalStorage.js`)
- **Utilities**: camelCase (`formatDate.js`, `validateInput.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.js`, `THEME_COLORS.js`)

### Folder Structure
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout-specific components
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── utils/               # Pure utility functions
├── constants/           # Application constants
├── contexts/            # React context providers
└── __tests__/           # Test files
```

## 🔧 Local Development Setup

### Prerequisites
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

### Environment Setup
```bash
# Clone the repository
git clone https://github.com/chaklesh/noto.git
cd noto

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env.local

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## 📊 Performance Guidelines

### Bundle Size
- Keep new additions under 10KB when possible
- Use dynamic imports for large features
- Optimize images and assets
- Monitor bundle analysis regularly

### Runtime Performance
- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Consider virtualization for large lists

### Accessibility
- Follow WCAG 2.1 guidelines
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

## 🔒 Security Guidelines

### Input Validation
- Sanitize all user inputs
- Validate data types and formats
- Prevent XSS attacks
- Use proper escaping for dynamic content

### Dependencies
- Keep dependencies updated
- Run security audits regularly (`npm audit`)
- Review dependency licenses
- Avoid dependencies with known vulnerabilities

## 🚦 Release Process

### Version Management
```bash
# Patch version (bug fixes): 1.0.0 → 1.0.1
npm run version:patch

# Minor version (new features): 1.0.0 → 1.1.0
npm run version:minor

# Major version (breaking changes): 1.0.0 → 2.0.0
npm run version:major
```

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped appropriately
- [ ] Git tags created
- [ ] Build successful
- [ ] Demo site updated
- [ ] Release notes prepared

## 📞 Getting Help

### Communication Channels
- **Issues**: [GitHub Issues](https://github.com/chaklesh/noto/issues) for bugs and feature requests
- **Discussions**: [GitHub Discussions](https://github.com/chaklesh/noto/discussions) for general questions
- **Email**: [chaklesh49@gmail.com](mailto:chaklesh49@gmail.com) for direct contact
- **Blog**: [chaklesh.blogspot.com](https://chaklesh.blogspot.com) for updates and tutorials

### Response Times
- **Issues**: Within 2-3 business days
- **Pull Requests**: Within 1 week
- **Email**: Within 24-48 hours

## 📜 Code of Conduct

### Our Standards
- **Be Respectful**: Treat everyone with respect and kindness
- **Be Collaborative**: Work together and help each other
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Remember that everyone has different experience levels
- **Be Professional**: Maintain a professional tone in all interactions

### Enforcement
Instances of unacceptable behavior may be reported to [chaklesh49@gmail.com](mailto:chaklesh49@gmail.com). All reports will be reviewed and investigated promptly.

## 🏆 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributor graphs
- Special mentions in blog posts

## 📄 License & Attribution

This project is licensed under the MIT License with the following requirements:
- **Attribution**: Credit must be given to the original author (Chaklesh Yadav)
- **Ownership**: All rights remain with the original author
- **Modifications**: Derivative works must include proper attribution
- **Personal Use**: Free for personal and educational use

---

## 🎉 Thank You!

Thank you for contributing to **Noto**! Your contributions help make this project better for everyone.

**Happy Coding! 🚀**

---

*Maintained by [Chaklesh Yadav](https://github.com/chaklesh) - Software Development Engineer*

*Connect: [chaklesh49@gmail.com](mailto:chaklesh49@gmail.com) | [chaklesh.blogspot.com](https://chaklesh.blogspot.com)*