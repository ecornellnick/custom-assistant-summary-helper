# custom-assistant-example-summary
Provides a concise summary of assignment instructions and requirements, filtering out non-essential content.
<br />

<a href="https://github.com/codio-extensions/custom-assistant-example-error-augmentation" target="_blank">Original Fork From Codio</a>

## Supported Courses:
- CIS540s: 
- CIS560s:

## Features:

### Assignment Summary:
- Provides a 1-2 sentence summary of the programming task
- Lists key requirements from the assignment
- Filters out non-essential content like style tags, script tags, and autograder feedback
- Maintains focus on core learning objectives

### Context Processing:
- Processes assignment instructions from guidesPage content
- Ignores HTML styling and scripting elements
- Excludes autograder feedback and test results
- Presents information directly addressing the student

### Customization:
- Modifiable systemPrompt to adjust summary style and format
- Configurable userPrompt to change context handling and filtering
- Adaptable instruction parsing for different assignment formats
