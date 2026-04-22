Citizen.CreateThread(function()
    while not NetworkIsSessionStarted() do
        Wait(500)
    end
    
    Wait(500)
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end)
