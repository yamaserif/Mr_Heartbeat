
function StartGettingHeartbeat() {
    function GetHeartbeat() {
        axios.get(getHeartbeatUrl).then(res => {
            updatePage(res.data.heartbeatPoint, res.data.datetime)
        })
    }
    setInterval(GetHeartbeat, settings.reloadTime)
}

StartGettingHeartbeat()