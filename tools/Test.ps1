$Date = Get-Date -Format "dd-MM-yyyy"
$ProposedBranch = "WeeklyExamplesUpdate/$Date"
$Exists = git branch -l $ProposedBranch
if ([string]::IsNullOrEmpty($Exists)) {
    git checkout -b $ProposedBranch
}else{
	Write-Host "Branch already exists"
    $CurrentBranch = git rev-parse --abbrev-ref HEAD
    if($CurrentBranch -ne $ProposedBranch){
        git checkout $ProposedBranch
     }
     git checkout $ProposedBranch
}