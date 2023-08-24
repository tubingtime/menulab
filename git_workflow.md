How to work on our project

# Step 1: Create an issue
Create an issue describing what you are working on. 

Try to specify what you are working on as much as possible:
- Feature: Adding new routes.
- Documentation: Adding documentation to api.
- Bug: Fixing a bug in ___.
- Feature: Experimenting with ___.

# Step 2: Create a branch
Create a branch to work in to resolve the issue.

Some suggestions for naming are starting your branch with the type of work
you are doing.
- bug/dashboard
- feature/menu_api
- documentation/menu_api

## A: Make a new branch.
You can make a new branch based on an existing one by:
```git branch <new-branch> <base-branch>```

Or just create a new branch by:
```git branch <new-branch>```

## B: Switch to the new branch.
```git checkout <new-branch>```

## C: Work in this branch.
Make commits to this branch.
Try to only work on things that address the issue you created. 

# Step 3: Create a Pull Request with your updates. 

# Step 4: Have a team member review your PR.

# Step 5: Merge your PR and delete the branch.
To delete a branch locally:
```git branch -d <branch>```

To delete a branch remotely:
```git push <remote> -delete <branch>```
ex.
```git push origin --delete fix/authentication```

#TODO: Complete this doc.
