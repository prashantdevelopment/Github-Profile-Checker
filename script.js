let searchbtn = document.querySelector(".search")
let usernameinp = document.querySelector(".usernameinp")
let card = document.querySelector(".card")


 
 function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error("User not Found");
        return raw.json();
    })
 }

 function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
        if (!raw.ok) throw new Error ("Failed to fetch error...")
        return raw.json();
    } )
 }

 function decorateProfileData(details){
    let data = `

        <!-- Avatar Placeholder -->
        <img src ="${details.avatar_url}"
        class="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 text-sm"
          Avatar
        />

        <!-- User Info -->
        <div class="flex-1">
          <h2 class="text-2xl font-semibold text-white">${details.name}</h2>
          <p class="text-slate-400 mt-1">${details.bio ? details.bio : ""}</p>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <p class="text-xl font-bold">${details.public_repos}</p>
              <p class="text-sm text-slate-400">Repositries</p>
            </div>
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <p class="text-xl font-bold">${details.followers}</p>
              <p class="text-sm text-slate-400">Followers</p>
            </div>
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <p class="text-xl font-bold">${details.following}</p>
              <p class="text-sm text-slate-400">Following</p>
            </div>
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <p class="text-xl font-bold">${details.location}</p>
              <p class="text-sm text-slate-400">Location</p>
            </div>
          </div>

          <!-- Profile Link -->
          <div class="mt-6">
            <a
              href="${details.html_url}"
              class="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 font-medium"
            >
              View GitHub Profile
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>`

    card.innerHTML = data;
 }


 searchbtn.addEventListener("click", function(){
   let username = usernameinp.value.trim();
   if(username.length > 0){
        getProfileData(username).then(data => {
            decorateProfileData(data);
        })
    }else{
    alert();
   }
 })