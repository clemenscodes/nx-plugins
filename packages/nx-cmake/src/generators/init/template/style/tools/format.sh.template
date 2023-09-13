#!/bin/sh

ignore_file=".clang-format-ignore"
project_path="$1"

# Check if project path is provided
if [ -z "$project_path" ]; then
    echo "Error: Please provide the project path as an argument."
    exit 1
fi

# Check if ignore file exists
if [ ! -f "$ignore_file" ]; then
    echo "Error: The ignore file '$ignore_file' does not exist."
    exit 1
fi

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Check if pattern should not be formatted
should_ignore() {
    path=$1
    while IFS= read -r pattern; do
        if echo "$path" | grep -Eq "$pattern"; then
            return 0
        fi
    done <"$ignore_file"
    return 1
}

# Check if clang-format is installed
if ! command -v clang-format > /dev/null 2>&1; then
    handle_error "clang-format is not installed. Please install clang-format."
fi

# Check if project path is a directory
if [ ! -d "$project_path" ]; then
    handle_error "The project path '$project_path' is not a valid directory."
fi

# Process each file
find "$project_path" -type f -regex '.*\.\(c\|h\|cpp\|hpp\)' | while IFS= read -r filepath; do
    if should_ignore "$filepath"; then
        echo "Skipping: $filepath"
    else
        echo "Formatting: $filepath"
        # Run clang-format with error handling
        if ! clang-format -style=file -i "$filepath"; then
            handle_error "Failed to format: $filepath"
        fi
    fi
done

echo "Formatting completed."
