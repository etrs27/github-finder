
function getProfile(e){
    e.preventDefault();

    let username = document.getElementById('username').value;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
            let user = JSON.parse(xhttp.responseText);
            let error = document.getElementById('error-container');

            if(user.name === null || user.name === undefined){
                error.className = "alert alert-danger"
                error.innerHTML = 'The username you entered does not exist.';
                document.getElementById('profile').innerHTML = `<h3 class="error-title">Please try again.</h3>`
            }
            else {
                error.className = "hidden";
                document.getElementById('username').value = '';
                
                document.getElementById('profile').innerHTML = `
                <div class="card text-white bg-dark">
                    <div class="card-header">
                        <h3 class="card-title">${user.name}</h3>
                        <h6 class="card-subtitle text-muted">${user.login}</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${user.avatar_url}">
                            </div>
                            <div class="col-md-9">
                                <span class="badge bg-primary">Public Repos ${user.public_repos}</span>
                                <span class="badge bg-danger">Public Gists ${user.public_gists}</span>
                                <br><br>
                                <ul class="list-group bg-light">
                                    <li class="list-group-item"><b>Website:</b> ${user.blog}</li>
                                    <li class="list-group-item"><b>Bio:</b> ${user.bio}</li>
                                </ul>
                                <br>
                                <a class="btn btn-primary" href="${user.html_url}" target="_blank">Visit Github</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }
    }

    xhttp.open('GET', 'https://api.github.com/users/' + username, true);
    xhttp.send();
}

document.getElementById('userForm').addEventListener('submit', getProfile, false);