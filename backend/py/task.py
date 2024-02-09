from dataclasses import dataclass
from collections import Counter, defaultdict

@dataclass
class File:
    id: int
    name: str
    categories: list[str]
    parent: int
    size: int


"""
Task 1

The idea behind the code is to grab all the files that cannot have children
Within the given scenario that would be any file that is not the type of "Folder"
Hence we filter based on that condition
"""
def leafFiles(files: list[File]) -> list[str]:
    
    all_leaves = []
    
    for file in files:
        if "Folder" not in file.categories:
            all_leaves.append(file.name)
    
    return all_leaves


"""
Task 2

The idea behind this is to first grab a count of how many times a category appears
We then sort these based on the count and alphabetical order
Finally we grab the `k` top categories and return
"""
def kLargestCategories(files: list[File], k: int) -> list[str]:

    category_count = Counter()
    for file in files:
        for category in file.categories:
            category_count[category] += 1
    
    # Using this map function it helps us sort the categories
    # The `-x[1]` part means we can sort it in reverse for that variable
    # This was done as reversing the list afterwards or using reverse = True did not yield the right behaviour
    # And it was not alphabetically sorted
    sorted_categories = sorted(category_count.items(), key = lambda x: (-x[1], x[0]))

    largest_categories = []
    for c_details in sorted_categories[:k]:
        largest_categories.append(c_details[0])

    return largest_categories

"""
Task 3

The breakdown of the code is that we first find all the files that have a parent, the sizes of all the files and 
the files that can be parents -> which are folders

We have a variable `max_size` that will store the largest file size currently 

After we calculate the total file size including the children -> we notice that folders can have grandchildren -> ie folders in folders
Thats why we do two runs of calculations, the first round of calculation will add all files but folders 
And then on the second run we just deal with the folders specifically and after all that we can determine the max
"""
def largestFileSize(files: list[File]) -> int:
    
    if not files:
        return 0
    
    file_children = defaultdict(list) # A dictionary that has a key being the file_id and the value being a list of all its children 
    file_sizes = Counter() # Contains the file sizes of every file
    folder_ids = set() # Holds all the file_ids that are type folder

    max_size = 0
    # First loop that will extract all the inital information for all the dictionaries and set above
    # Also will check for a max file as a file can be larger than folders
    for file in files:
        if file.parent != -1: 
            file_children[file.parent].append(file.id)

        if "Folder" in file.categories:
            folder_ids.add(file.id)

        file_sizes[file.id] += file.size
        
        max_size = max(max_size, file.size)
    
    # We setup another dictionary to hold the file sum of folders
    # Note that some files dont have children but we still need to account for it 
    current_file_sizes = {}
    for item in file_children.items():
        
        index, children = item
        # Have a temp_count for the sum to be added later
        # Also have a temp_list to allow for a second pass through to update the values
        temp_count = file_sizes[index]
        temp_list = []
    
        for child in children:
            if child in folder_ids:
                temp_list.append(child)
            else:
                temp_count += file_sizes[child]

        current_file_sizes[index] = temp_count
        file_children[index] = temp_list
    
    # The second pass is here to update all the files with folders as children
    # For file size calcuation we have an if statement to use either the values calculated here 
    # Or from the file_size dictionary
    for item in file_children.items():

        index, children = item
        for child in children:
            if child not in current_file_sizes:
                current_file_sizes[index] += file_sizes[child]
            else:
                current_file_sizes[index] += current_file_sizes[child]
        
        max_size = max(max_size, current_file_sizes[index])
    
    return max_size


if __name__ == '__main__':
    testFiles = [
        File(1, "Document.txt", ["Documents"], 3, 1024),
        File(2, "Image.jpg", ["Media", "Photos"], 34, 2048),
        File(3, "Folder", ["Folder"], -1, 0),
        File(5, "Spreadsheet.xlsx", ["Documents", "Excel"], 3, 4096),
        File(8, "Backup.zip", ["Backup"], 233, 8192),
        File(13, "Presentation.pptx", ["Documents", "Presentation"], 3, 3072),
        File(21, "Video.mp4", ["Media", "Videos"], 34, 6144),
        File(34, "Folder2", ["Folder"], 3, 0),
        File(55, "Code.py", ["Programming"], -1, 1536),
        File(89, "Audio.mp3", ["Media", "Audio"], 34, 2560),
        File(144, "Spreadsheet2.xlsx", ["Documents", "Excel"], 3, 2048),
        File(233, "Folder3", ["Folder"], -1, 4096),
    ]

    assert sorted(leafFiles(testFiles)) == [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]

    assert kLargestCategories(testFiles, 3) == [
        "Documents", "Folder", "Media"
    ]

    assert largestFileSize(testFiles) == 20992

    print("Given tests passed")
    
    """
    Extra tests
    
    Some extra tests written for debugging
    """
    testFilesTwo = [
        File(1, "Folder", ["Folder"], -1, 7),
        File(2, "Folder2", ["Folder"], 1, 5),
        File(3, "Folder3", ["Folder"], -1, 10),
    ]
    
    assert largestFileSize(testFilesTwo) == 12
    
    assert sorted(leafFiles(testFilesTwo)) == []

    testFilesThree = [
        File(1, "Folder", ["Folder"], -1, 7000),
        File(2, "Fake", ["Fake"], 1, 5000),
        File(3, "a.zip", ["ZIP"], -1, 1000000),
    ]
    
    assert kLargestCategories(testFilesThree, 3) == [
        "Fake", "Folder", "ZIP"
    ]
    
    assert largestFileSize(testFilesThree) == 1000000
    
    assert sorted(leafFiles(testFilesThree)) == [
        "Fake",
        "a.zip",
    ]
    
    print("Extra tests passed")

