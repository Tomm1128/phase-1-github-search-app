const init = () => {
  const userSection = document.getElementById("user-list")
  const repoSection = document.getElementById("repos-list")
  const toggleSearchBtn = document.getElementById("toggle-search")
  const searchLabel = document.getElementById("search-label")
  let labelText = searchLabel.textContent.split(" ")[0]

  const handleFetch = (url, callBack) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/vnd.github.v3+json",
      }})
    .then(resp => resp.json())
    .then(data => callBack(data))
    .catch(console.log)
  }

  const renderRepoList = (repoList) => {
    let repoArray = []
    if(typeof repoList.items != "undefined"){
      repoArray = repoList.items
    } else {
      repoArray = repoList
    }
    repoArray.forEach((repo) => {
      const li = document.createElement("li")
      const a = document.createElement("a")

      let repoUrl = repo.html_url 

      a.href = repoUrl
      a.textContent = `${repoUrl}`

      li.appendChild(a)
      repoSection.appendChild(li)
    })
  }

  const handleRepoBtn = (event) => {
    let selectedUser = event.target.parentNode.textContent.split(" ")[0]
    let url = `https://api.github.com/users/${selectedUser}/repos`
    repoSection.innerHTML = ""

    handleFetch(url, renderRepoList)
  }

  const renderSearch = (data) => {
    let repoBtns = []
    let searchList = data.items
    searchList.forEach((listItem) => {
      const li = document.createElement("li")
      const p = document.createElement("p")
      const img = document.createElement("img")
      const a = document.createElement("a")
      const btn = document.createElement("button")
      
      let userName = listItem.login
      let avatarImg = listItem.avatar_url
      let gitHubPage = listItem.html_url

      li.textContent = `${userName} `

      p.textContent = `Github: `

      a.href = gitHubPage
      a.textContent = `${gitHubPage}`

      img.src = avatarImg
      img.height = 250
      img.width = 250

      btn.textContent = "Repo List"
      
      p.appendChild(a)
      li.appendChild(btn)
      li.appendChild(p)
      li.appendChild(img)
      userSection.appendChild(li)

      repoBtns.push(btn)
    })

    repoBtns.forEach((btn) => {
      btn.addEventListener("click", handleRepoBtn)
    })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    let userInput 
    let url 

    userSection.innerHTML = ""
    repoSection.innerHTML = ""

    if (labelText === "User"){
      userInput = event.target.search.value 
      url = `https://api.github.com/search/users?q=${userInput}`
      handleFetch(url, renderSearch)
    } else {
      userInput = event.target.search.value 
      url = `https://api.github.com/search/repositories?q=${userInput}`
      handleFetch(url, renderRepoList)
    }
  }

  const searchForm = document.getElementById("github-form")

  toggleSearchBtn.addEventListener("click", () => {
    if (labelText === "User")
      labelText = "Repo"
    else 
      labelText = "User"

    searchLabel.textContent = `${labelText} Search`  
  })

  searchForm.addEventListener("submit", handleSearch)
}

document.addEventListener("DOMContentLoaded", init)
