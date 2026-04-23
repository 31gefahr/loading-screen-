AddEventHandler('onClientResourceStart', function (resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end

    print('Yükleme ekranı tamamlandı')
    
    
end)
