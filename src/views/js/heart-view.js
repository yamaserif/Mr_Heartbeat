
function StartGettingHeartbeat() {
    function GetHeartbeat() {
        axios.get(getHeartbeatUrl).then(res => {
            updatePage(res.data.heartbeatPoint)
        })
    }
    setInterval(GetHeartbeat, reloadTime)
}

StartGettingHeartbeat()