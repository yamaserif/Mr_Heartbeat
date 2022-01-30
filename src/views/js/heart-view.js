
function StartGettingHeartbeat() {
    function GetHeartbeat() {
        axios.get(getHeartbeatUrl).then(res => {
            document.getElementById('heartbeat').innerHTML = res.data.heartbeatPoint
        })
    }
    setInterval(GetHeartbeat, reloadTime)
}

StartGettingHeartbeat()