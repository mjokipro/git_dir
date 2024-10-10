import spidev
spi = spidev.SpiDev()
spi.open(1, 1)
spi.xfer(0x01)