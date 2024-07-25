# Set the maximum number of attempts
max_attempts=100

# Set a counter for the number of attempts
attempt_num=1

# Set a flag to indicate whether the command was successful
success=false
node loadDetailsUrls.js 'Drogaria Patrocinio' 
rm -f /Users/juliocesarogomes/data/'drogariapatrocinio'/*
# Loop until the command is successful or the maximum number of attempts is reached
while [ $success = false ] && [ $attempt_num -le $max_attempts ]; do
  # Execute the command
  node LoadingPageIFoodPO.js 'Drogaria Patrocinio' '/Users/juliocesarogomes/data/drogariapatrocinio/' zerout domcontentloaded 
   
  # Check the exit code of the command
  if [ $? -eq 0 ]; then
    # The command was successful
    success=true
  else
    # The command was not successful
    echo "Attempt $attempt_num failed. Trying again..."
    # Increment the attempt counter
    attempt_num=$(( attempt_num + 1 ))
  fi
done

# Check if the command was successful
if [ $success = true ]; then
  # The command was successful
  echo "The command was successful after $attempt_num attempts."
  
else
  # The command was not successful
  echo "The command failed after $max_attempts attempts."
fi
rm /Users/juliocesarogomes/data/'drogariapatrocinio'/.DS_Store
node main.js --type IFood --recipient "DROGARIA PATROCÍNIO" --location '/Users/juliocesarogomes/data/drogariapatrocinio/'
