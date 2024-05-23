const init = () => {
  let userSearchList
  const userSection = document.getElementById("user-list")

  const renderSearch = (searchList) => {
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
    })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    let userInput = event.target.search.value 
    userSection.innerHTML = ""

    fetch(`https://api.github.com/search/users?q=${userInput}`)
    .then(resp => resp.json())
    .then(searchList => renderSearch(searchList.items))
    .catch(console.log)
  }

  const searchForm = document.getElementById("github-form")

  searchForm.addEventListener("submit", handleSearch)
  

}


document.addEventListener("DOMContentLoaded", init)
