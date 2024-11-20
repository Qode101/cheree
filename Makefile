.PHONY: add commit push push_remote

# Add files to git:
add:
ifndef file
	$(error "Please specify the 'file' variable (e.g., make add file=<filename>)")
endif
	@echo "--- Adding files $(file) to git ---"
	git add $(file)
	@echo 

# Commit files to git:
commit:
ifndef message
	$(error "Please specify the 'message' variable (e.g., make commit message="Commit message")")
endif
	@echo "--- Committing files with message: $(message) ---"
	git commit -m "$(message)"
	@echo

# Push files to git:
push_remote:
	@echo "--- Pushing to remote repository ---"
	git push
	@echo "--- Push complete ---"
	@echo


push: add commit push_remote
	@echo "--- All done ---"
	@echo

