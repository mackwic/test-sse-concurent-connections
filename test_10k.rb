
clients_pid = []

SLICE_SIZE = 30

(1..10_000).each_slice(SLICE_SIZE) do |slice|
    puts "==== BATCH #{slice.first}-#{slice.last} ===="
    slice.each do |idx|
        if idx % SLICE_SIZE == 0
            # show output
            clients_pid << spawn("curl https://20210510-test-10k-live-connections.osc-fr1.scalingo.io/countdown")
        else
            # hide output
            clients_pid << spawn(
                "curl https://20210510-test-10k-live-connections.osc-fr1.scalingo.io/countdown",
                :err => "/dev/null",
                :out => "/dev/null",
                :in => "/dev/null",
            )
        end
    end
    sleep 0.25
end
puts

p clients_pid
puts "waiting 5 seconds..."
sleep 60

clients_pid.each { |pid| Process.kill 9, pid }